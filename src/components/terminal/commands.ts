import { basic, social, experiences, education, projects } from '@/config/cv.json';

export const commandsMap = {
    welcome:  [
        "Welcome to my terminal portfolio!",
        "----",
        "For a list of available commands, type `help`.",
    ],
    help: [
        "**whoami**       Help with main informations",
        "**experience**   Professional Experiences",
        "**education**    Educational background",
        "**skills**       Current skills",
        "**projects**     Main projects",
        "**social**       My main social networks",
        "**cv**           See CV. It's possible to do a download or see online",
        "**theme**        Set theme to `light` or `dark`",
        "**welcome**      See welcome message",
        "**clear**        Clears everything from the terminal",
    ],
    theme: [
        "Select a theme with as:",
        "`theme light`  Light Theme",
        "`theme dark`   Dark Theme",
    ],
    whoami: [
        "Hello!",
        `I'm ${basic.name}`,
        basic.summary
    ],
    experience: experiences.map((item) => `**${item.title} [${item.sub_title}] ${item.years}**
        ${item.details}
        Skills: [${item.skills.map((s) => `**${s.name}**`).join(', ')}]
        \n`
    ),
    education: education.map((item) => `**${item.title} [${item.sub_title}] ${item.years}**
        ${item.details}
        \n`
    ),
    skills: [`[${basic.skills.map((item) => `(${item.name})`).join(', ')}]`],
    projects: projects.map((item) => {
        const maxTitleLength = Math.max(...projects.map((s) => s.title.length));
        const padding = " ".repeat(maxTitleLength - item.title.length + 4);
        return `${item.title}${padding}[${item.link}](${item.link})`
    }),
    social: social.map((item) => {
        const maxTitleLength = Math.max(...social.map((s) => s.title.length));
        const padding = " ".repeat(maxTitleLength - item.title.length + 4);
        return `${item.title}${padding}[${item.url}](${item.url})`
    }),
    cv: [
        "Options for this command",
        "",
        "`cv download` download my cv local",
        "`cv online` redirect to online cv"
    ]
};

export const commandsExceptionsMap = {
    commandNotFound: [
        "Command not found. Try again with `help`"
    ],
    themeNotFound: [
        "Theme not found. Select `light` or `dark` theme"
    ],
}

export const commandsSuccessMap = {
    downloadCompleted: [
        "Download completed!"
    ],
    redirecting: [
        "Redirecting to the page"
    ]
}