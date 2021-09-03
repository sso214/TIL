const routes = [
    'Study',
    'Log',
    'Memo',
];

const createSidebar = () => {
    const sidebar = {};
    for (const route of routes) {
        Object.assign(sidebar, require("../" + route));
    }
    return sidebar;
};

module.exports = {
    title: "sso214's TIL",
    description: "Today I Learned",
    base: '/TIL/',
    themeConfig: {
        nav: [
            {text: 'Study', link: '/study/'},
            {text: 'Log', link: '/log/'},
            {text: 'Memo', link: '/memo/'},
            {
                text: 'sso214',
                items: [
                    {text: 'Info', link:'/info/'},
                    {text: 'Github', link:'https://github.com/sso214'}
                ]
            },
        ],
        sidebar: createSidebar(),
        smoothScroll: true
    },
}
