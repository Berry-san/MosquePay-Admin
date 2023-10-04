const adminmenu = [
  {
    icon: 'dashlite',
    text: ' Dashboard',
    link: '/',
  },
  // {
  //   icon: "bitcoin-cash",
  //   text: "Crypto Dashboard",
  //   link: "/crypto",
  // },
  // {
  //   icon: "growth",
  //   text: "Analytics Dashboard",
  //   link: "/analytics",
  // },
  // {
  //   icon: "coins",
  //   text: "Invest Dashboard",
  //   link: "/invest",
  // },

  {
    heading: 'Main Menu',
  },
  {
    icon: 'users',
    text: 'Users',
    link: '/user',
  },
  {
    icon: 'file-docs',
    text: 'Campaigns',
    link: '/campaign',
  },
  {
    icon: 'file-docs',
    text: 'Campaigns Payments',
    link: '/payments',
  },
  {
    icon: 'file-docs',
    text: 'Campaigns List',
    link: '/campaignList',
  },
  {
    icon: 'file-docs',
    text: 'Seminar',
    link: '/seminar',
  },
  {
    icon: 'file-docs',
    text: 'Message',
    link: '/aboutus',
  },
  {
    icon: 'mail',
    text: ' Email-Subscribers',
    link: '/email-subscribers',
  },
  {
    icon: 'card-view',
    text: 'Ramadan',
    link: '/ramadan',
  },
  {
    icon: 'social',
    text: ' Social-Media',
    link: '/socialmedia',
  },
  {
    icon: 'view-col',
    text: 'Needy',
    active: false,
    subMenu: [
      {
        text: 'Create Needy',
        link: '/createneedy',
      },
      {
        text: 'Needy Category',
        link: '/needy',
      },
    ],
  },
  {
    icon: 'tranx',
    text: 'Donation',
    active: false,
    subMenu: [
      {
        text: 'Create Friday Donation',
        link: '/createdonation',
      },
      {
        text: 'Friday Donation ',
        link: '/donation',
      },
    ],
  },
  {
    icon: 'card-view',
    text: 'Sheikh',
    active: false,
    subMenu: [
      {
        text: 'Create Sheikh',
        link: '/createsheikh',
      },
      {
        text: 'view Sheikh',
        link: '/sheikh',
      },
    ],
  },
  // {
  //   icon: 'dashlite',
  //   text: ' Questions',
  //   link: '/que',
  // },
  {
    icon: 'help',
    text: 'Question List',
    active: false,
    subMenu: [
      {
        text: 'Create Question',
        link: '/createquestion',
      },
      {
        text: 'Question List',
        link: '/question',
      },
    ],
  },
  {
    icon: 'view-col',
    text: ' Referral Count',
    link: '/referralcount',
  },
  {
    heading: '',
  },

  {
    icon: 'signout',
    text: 'Sign Out',
    link: '/logout',
    active: 'false',
  },
]

const userMenu = [
  {
    icon: 'dashlite',
    text: ' Questions',
    link: '/',
  },
  {
    icon: 'signout',
    text: 'Logout',
    link: '/logout',
  },
]
const accMenu = [
  {
    icon: 'dashlite',
    text: ' Campaigns',
    link: '/campaignreferral',
  },
  {
    icon: 'signout',
    text: 'Logout',
    link: '/logout',
  },
]
// export default  adminmenu;
export default sessionStorage.getItem('user_role') === 'admin'
  ? adminmenu
  : sessionStorage.getItem('user_role') === 'sheikh'
  ? userMenu
  : accMenu
