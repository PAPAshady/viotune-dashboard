import LogoImg from '@assets/images/logo/logo.png';
import './Logo.css';

export default function Logo({ size, isLoading, showText }) {
  const logoSize = {
    sm: 'w-[30px] h-[23px]',
    md: 'w-14 h-11',
    lg: 'w-[150px] h-[120px]',
    xl: 'w-[302px] h-[227px] mt-14',
    xxl: 'w-[412px] h-[317px] mt-16',
  };

  const textSize = {
    md: 'text-sm mt-1 font-medium',
    lg: 'subheading-1 font-bold ',
    xl: 'text-6xl mt-12 font-bold',
    xxl: 'text-7xl mt-14 font-bold',
  };

  // define diffrent color for each letter of logo text
  const letterColors = [
    'text-[#bdcaee]',
    'text-[#9dafe6]',
    'text-[#7c94de]',
    'text-[#5b7ad5]',
    'text-[#7c94de]',
    'text-[#9dafe6]',
    'text-[#bdcaee]',
  ];

  return (
    <div className="flex flex-col items-center">
      <img className={logoSize[size]} src={LogoImg} alt="VioTune" />
      {size !== 'sm' && (
        <div className={`text-center ${textSize[size]}`}>
          {/* set diffrent color for each letter of logo text */}
          {showText &&
            'VioTune'.split('').map((char, index) => (
              <span
                key={index}
                //Loading state only works if the letter has the display of inline-block
                className={`letter tracking-tight transition-all ${letterColors[index]} ${isLoading ? 'inline-block' : ''}`}
              >
                {char}
              </span>
            ))}
        </div>
      )}
    </div>
  );
}
