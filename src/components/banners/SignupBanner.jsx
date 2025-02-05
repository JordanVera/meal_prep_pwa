import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useUser } from '@/providers/UserContext';

const SignupBanner = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  const { user } = useUser();

  useEffect(() => {
    const bannerState = localStorage.getItem('isBannerVisible');
    if (bannerState === 'false') {
      setIsBannerVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsBannerVisible(false);
    localStorage.setItem('isBannerVisible', 'false');
  };

  if (!isBannerVisible || user) {
    return null;
  }

  return (
    <footer
      className={` fixed bottom-0 multi_gradient_bg w-full px-5 py-1 flex justify-between items-center`}
    >
      <h2 className="text-2xl font-bold text-black">M-M</h2>

      <p className="font-bold text-black text-md">
        Track health progress and meals by signing up today.{' '}
        <span className="font-normal">The best fitness app out there.</span>
      </p>

      <div className="flex items-center gap-3">
        <Link
          href={'/?signup=true'}
          className="px-4 py-2 text-white bg-black rounded-lg"
        >
          Sign Up
        </Link>

        <IconButton onClick={handleClose}>
          <Close className="text-black" />
        </IconButton>
      </div>
    </footer>
  );
};
export default SignupBanner;
