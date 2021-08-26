const routes = [
    'Study',
    'Daily',
    'Log',
    'Memo',
    'ToyProject',
    'Wiki',
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
    themeConfig: {
        nav: [
            {text: 'Study', link: '/study/'},
            {text: 'Daily', link: '/daily/'},
            {text: 'Log', link: '/log/'},
            {text: 'Memo', link: '/memo/'},
            {text: 'ToyProject', link: '/toyProject/'},
            {text: 'Wiki', link: '/wiki/'},
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
