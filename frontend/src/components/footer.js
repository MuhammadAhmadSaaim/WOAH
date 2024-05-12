import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'; // Importing social media icons

const Footer = () => (
  <div
    style={{
      backgroundColor: 'black', // Black background
      color: 'white', // White text for contrast
      padding: '20px', // Padding for spacing
      textAlign: 'center', // Center-aligns the text
    }}
  >
    <p>
      Made by Ali Nawaz<br/><br/> contact:&nbsp;
      <a href="mailto:chaudharyalinawazz@gmail.com" style={{ color: 'white'}}>
        chaudharyalinawazz@gmail.com</a>
    </p>

    <div className='my-3'>
      <a href="https://facebook.com" style={{ margin: '0 10px', color: 'white' }}>
        <FaFacebook size={30}/>
      </a>
      <a href="https://twitter.com" style={{ margin: '0 10px', color: 'white' }}>
        <FaTwitter size={30}/>
      </a>
      <a href="https://linkedin.com" style={{ margin: '0 10px', color: 'white' }}>
        <FaLinkedin size={30}/>
      </a>
    </div>

    <p>© 2024 Ali Nawaz. All rights reserved.</p>
  </div>
);

export default Footer;
