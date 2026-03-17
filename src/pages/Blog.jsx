import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBlog } from '../contexts/BlogContext';
import { FileText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function Blog() {
  const { posts } = useBlog();
  const canonical = window.location.origin + '/blog';

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <Helmet>
        <title>블로그 | 메타코스모스</title>
        <meta
          name="description"
          content="메타코스모스 블로그. 호텔·모텔 통합 OTT 도입 사례, 비용 절감 팁, 운영 노하우를 확인하세요."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="블로그 | 메타코스모스" />
        <meta
          property="og:description"
          content="도입 사례·운영 노하우·비용 절감 정보를 블로그로 제공합니다."
        />
        <meta property="og:url" content={canonical} />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center gap-2">
          <FileText className="text-cyan-400" size={36} />
          블로그
        </h1>
        <p className="text-slate-400">통합 OTT 소식과 활용 팁을 전합니다.</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, idx) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            whileHover={{ y: -4 }}
          >
            <Link to={`/blog/${post.id}`} className="block rounded-xl bg-slate-800/80 border border-cyan-500/20 overflow-hidden hover:border-cyan-500/50 transition-colors">
              <div className="aspect-video bg-slate-700/50 relative">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`absolute inset-0 flex items-center justify-center ${post.image ? 'hidden' : ''}`}>
                  <FileText className="text-cyan-400/60" size={64} />
                </div>
              </div>
              <div className="p-5">
                <h2 className="font-bold text-lg text-slate-200 mb-2 line-clamp-2">{post.title}</h2>
                <p className="text-sm text-slate-400 line-clamp-2">{post.excerpt}</p>
                <span className="text-xs text-cyan-400 mt-2 block">{post.createdAt}</span>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
