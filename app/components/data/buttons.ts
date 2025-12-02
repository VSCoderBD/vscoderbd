interface TypeLinks {
    label?: string;
    href?: string;
    sec?:string;
    image?: string;
}

   export const userLinks: TypeLinks[] = [
        { image: "/images/svg/nav-svg/shop.svg", href: "/" }
    ]

   export const secLinks: TypeLinks[] = [
    { image: "/images/svg/nav-svg/profile.svg", sec: "about" },
    { image: "/images/svg/nav-svg/resume.svg", sec: "resume" },
    { image: "/images/svg/nav-svg/skills.svg", sec: "skills" },
    { image: "/images/svg/nav-svg/blog.svg", sec: "blog" },
    { image: "/images/svg/nav-svg/contact.svg", sec: "contact" },
    { image: "/images/svg/nav-svg/lessons.svg", sec: "lessons" },
]


   export const contactLinks: TypeLinks [] = [
    { image: "/images/svg/contacts/call.svg", href: "/" },
    { image: "/images/svg/contacts/email.svg", href: "/" }
];
