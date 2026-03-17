import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'contentcube_blogs';

const defaultPosts = [
  { id: '1', title: '호텔 통합 OTT, 왜 필요한가요?', excerpt: '투숙객이 객실에서 넷플릭스·디즈니+를 쓰려면 어떻게 해야 할까요?', image: '/자료/images/service-tv.jpg', body: '호텔·모텔 등 숙박 시설에서는 투숙객이 객실에서 OTT 서비스를 이용하고 싶어 합니다. 개인 구독 없이, 설치 비용 부담 없이 메타코스모스 통합 OTT로 해결할 수 있습니다.', createdAt: '2025-01-15' },
  { id: '2', title: '통합 OTT 도입 후 예상 효과', excerpt: '고객 만족도와 매출에 어떤 변화가 있을까요?', image: '/자료/images/effect1.jpg', body: '도입 업체에서는 고객 만족도 상승, 재방문률 증가, 리뷰 점수 개선을 보고 있습니다. 케이블 비용 절감과 함께 부가 매출 증대 효과도 기대할 수 있습니다.', createdAt: '2025-01-20' },
  { id: '3', title: '설치부터 운영까지 한 번에', excerpt: '설치 비용과 절차는 어떻게 되나요?', image: '/자료/images/setop.jpg', body: '4K UHD 셋톱박스와 전용 리모컨을 무상 임대해 드립니다. 설치비 없이 월 사용료만으로 바로 서비스를 시작할 수 있으며, 24시간 원격 A/S로 운영 부담을 줄였습니다.', createdAt: '2025-02-01' },
];

const loadPosts = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    savePosts(defaultPosts);
  } catch (_) {}
  return defaultPosts;
};

const savePosts = (posts) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

const BlogContext = createContext(null);

export const BlogProvider = ({ children }) => {
  const [posts, setPostsState] = useState(loadPosts);

  useEffect(() => {
    savePosts(posts);
  }, [posts]);

  const setPosts = (next) => {
    setPostsState(typeof next === 'function' ? next(posts) : next);
  };

  const getPost = (id) => posts.find((p) => p.id === String(id));

  const addPost = (post) => {
    const id = String(Date.now());
    setPostsState((prev) => [{ ...post, id, createdAt: new Date().toISOString().slice(0, 10) }, ...prev]);
    return id;
  };

  const updatePost = (id, data) => {
    setPostsState((prev) => prev.map((p) => (p.id === String(id) ? { ...p, ...data } : p)));
  };

  const deletePost = (id) => {
    setPostsState((prev) => prev.filter((p) => p.id !== String(id)));
  };

  return (
    <BlogContext.Provider value={{ posts, setPosts, getPost, addPost, updatePost, deletePost }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const ctx = useContext(BlogContext);
  if (!ctx) throw new Error('useBlog must be used within BlogProvider');
  return ctx;
};
