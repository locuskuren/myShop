import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom';

import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-left">
        <span>myshop.</span>
      </div>
      <div className="footer-center">Copyright ©2022 All rights reserved</div>
      <div className="footer-right">
        <Link to={{ pathname: 'https://www.instagram.com/' }} target="_blank">
          <InstagramIcon />
        </Link>
        <Link to={{ pathname: 'https://www.facebook.com/' }} target="_blank">
          <FacebookIcon />
        </Link>
        <Link to={{ pathname: 'https://twitter.com/' }} target="_blank">
          <TwitterIcon />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
