import { useState, useEffect, useRef } from "react";
import { basic, social, experiences, education, projects } from '@/config/cv.json';
import { toggleMarkdownTheme, updateToggleThemeIcon } from "@/scripts/theme";

function formatCommand(command: string) {
    return command.split('\n').map((line) => line.trimStart()).join('\n')
}

const commands = {
    welcome:  [
        "Welcome to my terminal portfolio!",
        "----",
        "For a list of available commands, type `help`.",
    ],
    help: [
        "`whoami`       Help with main informations",
        "`experience`   Professional Experiences",
        "`education`    Educational background",
        "`skills`       Current skills",
        "`projects`     Main projects",
        "`social`       My main social networks",
        "`clear`        Clears everything from the terminal",
        "`theme`        Set theme to `light` or `dark`"
    ],
    whoami: [
        "Hello!",
        `I'm ${basic.name}`,
        basic.summary
    ],
    experience: experiences.map((exp) => {
        return formatCommand(`\`${exp.title} [${exp.sub_title}] ${exp.years}\`

            ${exp.details}

            Skills: [${exp.skills.map((s) => `(${s.name})`).join(', ')}]
        \n`);
    }),
    education: education.map((ed) => {
        return formatCommand(`\`${ed.title} [${ed.sub_title}] ${ed.years}\`
            
            ${ed.details}
        \n`)
    }),
    skills: [`[${basic.skills.map((s) => `(${s.name})`).join(', ')}]`],
    projects: projects.map((prj) => {
        return formatCommand(`${prj.title}
            [${prj.link}](${prj.link})
        `)
    }),
    social: social.map((s) => {
        const maxTitleLength = Math.max(...social.map((x) => x.title.length));
        const padding = " ".repeat(maxTitleLength - s.title.length + 4);
        return `${s.title}${padding}[${s.url}](${s.url})`
    }),
};

const commandNotFound = "Command not found. Try again with `help`";
const themeNotFound = "Theme not found. Select `light` or `dark` theme";

function translateCommandToHTML(command: string) {
    const parts = command?.split(/(`[^`]+`|\([^\)]+\)|\[[^\]]+\]\([^)]+\))/g) || [];
    const format = (t: string) => t.replaceAll(/[`()]/g, '');

    return (
        <pre className="whitespace-pre-wrap">
            {parts.map((part, index) => {
                if (part.startsWith('`')) {
                    return (
                        <span key={index} className="text-primary font-mono">
                            {format(part)}
                        </span>
                    );
                }
                else if (part.startsWith('(') && part.endsWith(')')) {
                    return (
                        <span key={index} className="text-secondary font-mono">
                            {format(part)}
                        </span>
                    );
                }
                else if (part.match(/\[[^\]]+\]\([^)]+\)/)) {
                    const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
                    const text = match?.[1];
                    const link = match?.[2];
                    return (
                        <a key={index} href={link} className="text-primary underline font-mono" target="_blank" rel="noopener noreferrer">
                            {text}
                        </a>
                    );
                }
                else {
                    return <span key={index}>{part}</span>;
                }
            })}
        </pre>
    );
}

export function Terminal() {
    const [command, setCommand] = useState("");
    const [output, setOutput] = useState<React.ReactNode[]>([<pre className="flex"><p className="font-bold text-primary font-mono">[math-term:~$]</p>&nbsp;<p className="font-mono">welcome</p></pre>,commands.welcome.map(translateCommandToHTML), <br/>]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    function handleCommand () {
        if(command.startsWith("theme")) {
            const themes = ["light", "dark"];
            const theme = command.replace("theme ", "").trim();
            if(themes.includes(theme)) {
                document.documentElement.dataset.theme = theme;
                localStorage.setItem('theme', theme);
                updateToggleThemeIcon();
                toggleMarkdownTheme(theme);

                setOutput((prev) => [...prev, <div className="flex"><p className="font-bold text-primary">[math-term:~$]</p>&nbsp;<br/><p>{command}</p></div>, <br/>]);
            } else {
                setOutput((prev) => [...prev, <div className="flex"><p className="font-bold text-primary">[math-term:~$]</p>&nbsp;<br/><p>{command}</p></div>, <br/>, translateCommandToHTML(themeNotFound), <br/>]);
            }
        } else {
            if (command in commands) {
                setOutput((prev) => [...prev, <div className="flex"><p className="font-bold text-primary">[math-term:~$]</p>&nbsp;<br/><p>{command}</p></div>, <br/>,commands[command].map(translateCommandToHTML), <br/>]);
            } else if (command === "clear") {
                setOutput([]);
            } else {
                setOutput((prev) => [...prev, <div className="flex"><p className="font-bold text-primary">[math-term:~$]</p>&nbsp;<br/><p>{command}</p></div>, <br/>, translateCommandToHTML(commandNotFound), <br/>]);
            }
        }
        setCommand("");
    };

    useEffect(() => {
        const focusTextarea = (event: MouseEvent) => {
            if (textareaRef.current && event.target !== textareaRef.current) {
                textareaRef.current.focus();
            }
        };

        document.addEventListener("click", focusTextarea);
        return () => document.removeEventListener("click", focusTextarea);
    }, []);

    return (
        <div className="max-w-6x h-full m-4">
            <div className="">
                <pre className="output">
                    {output.map((line, index) => (
                        <pre key={index}>{line}</pre>
                    ))}
                </pre>

                <pre className="flex">
                    <p className="font-bold text-primary font-mono">[math-term:~$]</p>&nbsp;
                    <p className="font-mono">{command}</p>
                    <span className="inline-block w-[10px] h-[1.5em] bg-text animate-[blinker_1s_linear_infinite] font-mono"></span>
                </pre>
                
                <textarea
                    ref={textareaRef}
                    autoFocus
                    className="position absolute -left-96"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleCommand();
                        }
                    }}
                />
            </div>
        </div>
    )
}