import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-20 text-center max-w-sm mx-auto">
      <h1 className="text-5xl font-extrabold text-zinc-300 mb-2">404</h1>
      <p className="text-xs text-zinc-400 mb-6">Trang bạn tìm kiếm không tồn tại.</p>
      <Link to="/">
        <Button variant="secondary" size="sm">
          Về trang chủ
        </Button>
      </Link>
    </div>
  );
};
