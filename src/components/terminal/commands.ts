import { toggleMarkdownTheme, updateToggleThemeIcon } from '@/scripts/theme';
import { basic, social, experiences, education, projects } from '@/config/cv.json';

/* Abstractions */

interface Command {
    execute(args: string[]): null | string;
}

interface SubCommand {
    execute(args: string[]): null | string;
}

const games: string[] = [
    "flappy-bird",
    "pong",
    "tic-tac-toe",
    "hangman",
    "memory",
    "tetris",
];

/* Sub-commands */

class CvHelpSubCommnad implements SubCommand {
    execute(): string {
        return [
            "Options command **cv**:",
            "",
            "**cv help**        Show cv commnad docs",
            "**cv online**      Open my online CV",
            "**cv download**    Download my CV",
        ].join("\n");
    }
}

class CVOnlineSubCommand implements SubCommand {
    execute() {
        window.open(basic.cv_link, "_blank");
        return null;
    }
}

class CVDownloadSubCommand implements SubCommand {
    execute() {
        const link = document.createElement("a");
        link.href = `${basic.cv_link}/export?format=pdf`;
        link.download = "";
        link.click();

        return null;
    }
}

class GamesHelpSubCommand implements SubCommand {
    execute() {
        return [
            "Options command **games**:",
            "",
            "**games help**              Show games commnad docs",
            "**games list**              List existings games",
            "**games run [game_name]**   Run game to play",
        ].join("\n");
    }
}

class GamesListSubCommand implements SubCommand {
    execute() {
        return [
            "The existing games are:",
            "",
            ...games.map((game) => `- ${game}`),
            "",
            "To play, write: **games run [game_name]**"
        ].join("\n");
    }
}

class GamesRunSubCommand implements SubCommand {
    execute(args: string[]) {
        if (args.length === 0) {
            return "You need select a game!";
        }
        if (!games.includes(args[0])) {
            return "This game doesn't exist. Please select an existing game."
        }
        /* TODO: Implements games run on screen */
        return args[0] + " runnnig.... ";
    }
}

/* Commands */

export class WhoAmICommand implements Command {
    execute() {
        return [
            "Hello!",
            `I'm ${basic.name}`,
            basic.summary
        ].join("\n");
    }
}

export class ExperienceCommand implements Command {
    execute() {
        return experiences.flatMap((item) => [
            `**${item.title} [${item.sub_title}] ${item.years}**`,
            "",
            `${item.details}`,
            "",
            `Skills: [${item.skills.map((s) => `**${s.name}**`).join(', ')}]`,
            "",
            "----",
            ""
        ]).join("\n");
    }
}

export class EducationCommand implements Command {
    execute() {
        return education.flatMap((item) => [
            `**${item.title} [${item.sub_title}] ${item.years}**`,
            "",
            `${item.details}`,
            "",
            "----",
            "",
        ]).join("\n");
    }
}

export class SkillsCommand implements Command {
    execute() {
        return `[${basic.skills.map((item) => `**${item.name}**`).join(', ')}]`;
    }
}

export class ProjectsCommand implements Command {
    execute() {
        return projects.map((item) => {
            const maxTitleLength = Math.max(...projects.map((s) => s.title.length));
            const padding = " ".repeat(maxTitleLength - item.title.length + 4);
            return `${item.title}${padding}[${item.url}](${item.url})`
        }).join("\n");
    }
}

export class SocialCommand implements Command {
    execute() {
        return social.map((item) => {
            const maxTitleLength = Math.max(...social.map((s) => s.title.length));
            const padding = " ".repeat(maxTitleLength - item.title.length + 4);
            return `${item.title}${padding}[${item.url}](${item.url})`
        }).join("\n");
    }
}

export class CVCommand implements Command {
    private subCommands: Map<string, SubCommand> = new Map();

    constructor() {
        this.registerSubCommand("help", new CvHelpSubCommnad());
        this.registerSubCommand("online", new CVOnlineSubCommand());
        this.registerSubCommand("download", new CVDownloadSubCommand());
    }

    registerSubCommand(name: string, command: SubCommand) {
        this.subCommands.set(name, command);
    }

    execute(args: string[]) {
        if (args.length === 0) {
            return "The command **cv** needs arguments. Use **cv help** for more details.";
        }

        const subCommand = this.subCommands.get(args[0]);
        if (!subCommand) {
            return `Subcommand not found **${args[0]}**. Use . Use **cv help** for more details.`;
        }

        return subCommand.execute(args.slice(1));
    }
}

export class ThemeCommand implements Command {
    execute(args: string[]) {
        const theme = args[0];
        const options = ["light", "dark"];

        if (args.length === 0) {
            return [
                "Options command **theme**:",
                "",
                ...options.map((option) => `**theme ${option}**`),
            ].join("\n");
        }

        if (options.includes(theme)) {
            document.documentElement.dataset.theme = theme;
            localStorage.setItem("theme", theme);
            updateToggleThemeIcon();
            toggleMarkdownTheme(theme);

            return `Changed to theme ${theme}`;
        }

        return [
            "Theme not found. Select valid theme oprions:",
            options.map((option) => `- ${option}`),
        ].join("\n");
    }
}

export class GamesCommand implements Command {
    private subCommands: Map<string, SubCommand> = new Map();

    constructor() {
        this.registerSubCommand("help", new GamesHelpSubCommand());
        this.registerSubCommand("list", new GamesListSubCommand());
        this.registerSubCommand("run", new GamesRunSubCommand());
    }

    registerSubCommand(name: string, command: SubCommand) {
        this.subCommands.set(name, command);
    }

    execute(args: string[]) {
        if (args.length === 0) {
            return "The command **games** needs arguments. Use **games help** for more details.";
        }

        const subCommand = this.subCommands.get(args[0]);
        if (!subCommand) {
            return `Subcommand not found **${args[0]}**. Use . Use **games help** for more details.`;
        }

        return subCommand.execute(args.slice(1));
    }
}

export class WelcomeCommand implements Command {
    execute() {
        return [
            "Welcome to my terminal portfolio!",
            "----",
            "For a list of available commands, type **help**.",
        ].join("\n");
    }
}

export class HelpCommand implements Command {
    execute(): string {
        return [
            "Command Options:",
            "",
            "**whoami**       Personal presentation",
            "**experience**   Professional Experiences",
            "**education**    Educational background",
            "**skills**       Current skills",
            "**projects**     Main projects",
            "**social**       My main social networks",
            "**cv**           See CV. It's possible to do a download or see online",
            "**theme**        Set theme to `light` or `dark`",
            "**help**         Help with main informations",
            "**welcome**      See welcome message",
            "**echo**         Write something on terminal",
            "**clear**        Clears everything from the terminal",
        ].join("\n");
    }
}

export class EchoCommand implements Command {
    execute(args: string[]): string {
        return args.join(" ");
    }
}

export class ClearCommand implements Command {
    execute() {
        return null;
    }
}

/* Invoker */

export class CommandInvoker {
    private commands: Map<string, Command> = new Map();

    registerCommand(name: string, command: Command) {
        this.commands.set(name, command);
    }

    executeCommand(input: string) {
        const [name, ...args] = input.trim().split(" ");
        const command = this.commands.get(name);

        if (!command) {
            return `Command ${input} not found. Use **help** to see more options`;
        }

        return command.execute(args);
    }
}