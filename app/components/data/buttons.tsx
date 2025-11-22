interface TypeLinks {
    label?: string;
    href?: string;
    sec?:string;
    image?: string;
}

   export const mainLinks: TypeLinks[] = [
        { label: "Rahat Hossain", href: "/" }
    ]

   export const userLinks: TypeLinks[] = [
        { image: "/images/svg/shop.svg", href: "/" }
    ]

   export const secLinks: TypeLinks[] = [
    { image: "/images/svg/profile.svg", sec: "about" },
    { image: "/images/svg/works.svg", sec: "works" },
    { image: "/images/svg/skills.svg", sec: "skills" },
    { image: "/images/svg/resume.svg", sec: "resume" },
    { image: "/images/svg/contact.svg", sec: "contact" },
    { image: "/images/svg/blog.svg", sec: "blog" },
    { image: "/images/svg/lessons.svg", sec: "lessons" },
]


   export const contactLinks: TypeLinks [] = [
    { image: "/images/contacts/call.svg", href: "/" },
    { image: "/images/contacts/email.svg", href: "/" }
];
