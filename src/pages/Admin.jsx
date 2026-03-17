import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBlog } from '../contexts/BlogContext';
import { motion } from 'framer-motion';
import { LogIn, LogOut, Plus, Pencil, Trash2, FileText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const emptyPost = { title: '', excerpt: '', image: '', body: '' };

export default function Admin() {
  const { isAdmin, login, logout } = useAuth();
  const { posts, addPost, updatePost, deletePost } = useBlog();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyPost);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError(false);
    if (login(id, password)) return;
    setLoginError(true);
  };

  const handleLogout = () => {
    logout();
    setEditingId(null);
    setForm(emptyPost);
  };

  const startAdd = () => {
    setEditingId('new');
    setForm(emptyPost);
  };

  const startEdit = (post) => {
    setEditingId(post.id);
    setForm({ title: post.title, excerpt: post.excerpt || '', image: post.image || '', body: post.body || '' });
  };

  const savePost = (e) => {
    e.preventDefault();
    if (editingId === 'new') {
      addPost(form);
      setForm(emptyPost);
      setEditingId(null);
    } else {
      updatePost(editingId, form);
      setEditingId(null);
      setForm(emptyPost);
    }
  };

  const removePost = (postId) => {
    if (window.confirm('이 글을 삭제할까요?')) deletePost(postId);
    setEditingId(null);
  };

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <Helmet>
          <title>관리자 | 메타코스모스</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-slate-800/80 border border-cyan-500/30 p-8"
        >
          <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <LogIn className="text-cyan-400" size={28} />
            관리자 로그인
          </h1>
          <p className="text-slate-400 text-sm mb-6">최고관리자만 블로그를 관리할 수 있습니다.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">아이디</label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400"
                placeholder="••••••"
              />
            </div>
            {loginError && <p className="text-red-400 text-sm">아이디 또는 비밀번호가 올바르지 않습니다.</p>}
            <button type="submit" className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition-colors">
              로그인
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <Helmet>
        <title>블로그 관리 | 메타코스모스</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="text-cyan-400" size={28} />
          블로그 관리
        </h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={startAdd}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-medium transition-colors"
          >
            <Plus size={18} /> 새 글
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors"
          >
            <LogOut size={18} /> 로그아웃
          </button>
        </div>
      </div>

      {editingId ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-slate-800/80 border border-cyan-500/30 p-6 mb-8"
        >
          <h2 className="text-lg font-bold mb-4">{editingId === 'new' ? '새 글 작성' : '글 수정'}</h2>
          <form onSubmit={savePost} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">제목</label>
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full px-4 py-2 bg-slate-700/50 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">요약</label>
              <input
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                className="w-full px-4 py-2 bg-slate-700/50 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">이미지 URL</label>
              <input
                value={form.image}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                className="w-full px-4 py-2 bg-slate-700/50 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400"
                placeholder="/자료/images/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">본문</label>
              <textarea
                value={form.body}
                onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                rows={6}
                className="w-full px-4 py-2 bg-slate-700/50 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 resize-y"
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-medium">
                저장
              </button>
              <button type="button" onClick={() => { setEditingId(null); setForm(emptyPost); }} className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg font-medium">
                취소
              </button>
            </div>
          </form>
        </motion.div>
      ) : null}

      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.id} className="flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-800/80 border border-cyan-500/20">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-slate-200 truncate">{post.title}</h3>
              <p className="text-sm text-slate-400">{post.createdAt}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link to={`/blog/${post.id}`} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline text-sm">
                보기
              </Link>
              <button type="button" onClick={() => startEdit(post)} className="p-2 text-slate-400 hover:text-cyan-400">
                <Pencil size={18} />
              </button>
              <button type="button" onClick={() => removePost(post.id)} className="p-2 text-slate-400 hover:text-red-400">
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
