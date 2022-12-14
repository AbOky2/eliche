module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './stories/**/*.{js,ts,jsx,tsx}',
  ],
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './stories/**/*.{js,ts,jsx,tsx}',
  ],
  variants: ['responsive'],
  theme: {


    screens: {
      'iphone3': {'max': '399px'},
      'nokia': {'max': '360px'},
      'blackberry': {'min': '361px'},
      'mobile': {'min': '400px'},
      'tablette': {'min': '727px'},
      

      '2xl': {'min': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'min': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'min': '960px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},

      'xs': {'max': '447px'},

      'xs': {'max': '335px'},


      // => @media (max-width: 639px) { ... }
    },

    extend: {
      fontFamily:{
        _spaceGrotesk:'Space Grotesk',
       

      },
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          400: 'var(--color-primary-400)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
        },
        tertiary: {
          DEFAULT: 'var(--color-tertiary)',
        },
        _bleuMarine:"#1A2E6C",
        _grisBleu: "#849CD9",
        _titre:"#113EB6",
        _rougeStudea:"#C23D3B",
        _gris:"#6976A0",
        _bordureBleu:"#EAEFFA",
        _pieces:"#0E215C",
        _switchButton:"#191f2c",
        _aPropos : "#3679FF",
        _bleuCiel:"#ebf0f9",
        _vert : "#edf8f0",
        _orange:"#fef2d5",
        _violet :"#f5eaf9",
        _bleuFonce:"#4842e3",

      },
      fontSize: {
        _28: '28px',
        _34: '34px',
        _68: '68px',
        _38: '38px',
        _28: '28px',
      },
      lineHeight: {
        _100: '100%',
        _110: '110%',
      },
      width:{
        _344: '344px',
        _295:'295px',
        _712:"712px",
        _388:"388px",
        _536:"536px",
        _596:"596px",
        _664:"664px",
        _74:"74px",
        _46:"46px",
        _81:"81px",
        _34:"34px",
        _259:'259px',
        _200:'200px',
        _702:'702px',
        _1006:'1006px',
        _216:'216px',
        _174:'174px',
        _53:'53px',
        _274:'274px',
        _39:'39px',
        _264:'264px',
        _312:'312px',
        _341:'341px',
        _23:'23px',
        _164:'164px',
        _147:'147px',
        _515:'515px',
        _426:'426px',
        _936:'936',
        _150:'150px',
        _489:'489px',
        _1243:'1243px',
        _300:'300px',
        _253:'253px',
        _189:'189px',
        _75:'75px',
        _131:'131px',
        _567:'567px',
        _233:'233px',
        _213:'213px',












        

      },
      height:{
        _23:'23px',
        _68: '68px',
        _295:'295px',
        _411:"411px",
        _153:"153px",
        _712:"712px",
        _34:"34px",
        _175:'175px',
        _23:'23px',
        _402:'402px',
        _601:'601px',
        _120:'120px',
        _53:'53px',
        _39:'39px',
        _46:'46px',
        _343:'343px',
        _460:'460px',
        _97:'97px',
        _198:'198px',
        _221:'221px',
        _75:'75px',
        _59:'59px',
        _205:'205px',




      },

      top:{
        _1060: '1060px',
        _1195:'1195px',
        _1161:"1161px",
        _1127:"1127px",
        _1093:"1093px",
        _987:"987px",
        _942:"942px",
        _736: "736px",
        _51:'51px',
        _813:'813px',
        _1369:'1369px',
        _1229:'1229px',
        _942:'942px',
        _1314:'1314px',
        _1255:'1255px',
        _736:'736px',
        _772:'772px',
        _814:'814px',
        _1369:'1369px',
        _1229:'1229px',
        _463:"463px",
        _413:"413px",
        _7:"7px",
        _15:'15px',
        _45:"80%",
        _461:'461px',
        _435:'435px',
        _797:'797px',
        _1106:'1106px',
        _1460:'1460px',




        

      },

      left:{
        _584: '584px',
        _604:'604px',
        _452:"452px",
        _65:"65px",
        _30:"30px",
        _987:"987px",
        _942:"942px",
        _727: "727px",
        _555:'555px',
        _425:'425px',
        _545:'545px',
        _793:'793px',
        _707:'707px',
        _569:'569px',
        _571:'571px',
        _636:'636px',
        _632:'632px',
        _722:'722px',
        _811:'811px',
        _784:'784px',
        _808:'808px',
        _881:'881px',
        _890:'890px',
        _981:'981px',
        _1001:'1001px',
        _991:'991px',
        _713:'713px',
        _584:'584px',
        _604:'604px',
        _452:'452px',
        _65:'65px',
        _60:'60px',
        _727:'727px',
        _425:'425px',
        _793:'793px',
        _579:'579px',
        _295:'295px',
        _303:'303px',
        _123:'123px',
        _158:'158px',
        _371:'371px',
        _741:'741px',
        _115:'115px',
        _1088:'1088px',
        _1143:'1143px',
        _443:'443px',
        _1210:'1210px',
        _756:'756px',
        _878:'878px',
        _844:'844px',
        _1172:'1172px',
        _914:'914px',












      }
    },
  },
  plugins: [],
};