import { useState, useEffect, useRef, type ReactNode } from "react";
import { toggleMarkdownTheme, updateToggleThemeIcon } from "@/scripts/theme";
import { commandsExceptionsMap, commandsMap, commandsSuccessMap } from "./commands";
import { transformMarkdown } from "./transform-markdown";
import { basic } from '@/config/cv.json';

const bashDesign = '[math-term:~$]';

function translateCommandToHTML(command: string) {
    return (
        <pre className="whitespace-pre-wrap">
            { transformMarkdown(command) }
        </pre>
    );
}

const initialStateCommand = [
    <pre className="flex">
        <p className="font-bold text-primary font-mono">{bashDesign}</p>&nbsp;
        <p className="font-mono">welcome</p>
    </pre>,
    <pre className="whitespace-pre-wrap">
        { commandsMap.welcome.map(transformMarkdown) }
    </pre>,
    <br/>,
];

export function Terminal() {
    const [command, setCommand] = useState("");
    const [output, setOutput] = useState<React.ReactNode[]>(initialStateCommand);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    function appendOutput(command: string, content: ReactNode[]) {
        setOutput((prev) => [
            ...prev,
            <div className="flex">
                <p className="font-bold text-primary">{bashDesign}</p>&nbsp;<br />
                <p>{command}</p>
            </div>,
            <br />,
            ...content,
            <br />,
        ]);
    }

    function handleThemeCommand(command: string) {
        const themes = ["light", "dark"];
        const theme = command.replace("theme ", "").trim();

        if (themes.includes(theme)) {
            document.documentElement.dataset.theme = theme;
            localStorage.setItem("theme", theme);
            updateToggleThemeIcon();
            toggleMarkdownTheme(theme);
            appendOutput(command, []);
        } else if(theme === "theme") {
            appendOutput(command, commandsMap.theme.map(translateCommandToHTML));
        } else {
            appendOutput(command, commandsExceptionsMap.themeNotFound.map(translateCommandToHTML));
        }
    }

    function handleClearCommand() {
        setOutput([]);
    }

    function handleMappedCommand(command: string) {
        const commandKey = Object.keys(commandsMap).find((cmd) => command.startsWith(cmd));
        if (commandKey) {
            appendOutput(command, commandsMap[commandKey].map(translateCommandToHTML));
        } else {
            appendOutput(command, commandsExceptionsMap.commandNotFound.map(translateCommandToHTML));
        }
    }

    function handleCVCommand(command: string) {
        const options = ["online", "download"];
        const option = command.replace("cv ", "").trim();

        if (options.includes(option)) {
            if(option === "online") {
                appendOutput(command, commandsSuccessMap.redirecting);
                window.open(basic.cv_link, "_blank");
            } else if(option === "download") {
                const downloadCVLink = `${basic.cv_link}/export?format=pdf`;
                const anchor = document.createElement("a");
                anchor.href = downloadCVLink;
                anchor.download = "";
                document.body.appendChild(anchor);
                anchor.click();
                document.body.removeChild(anchor);
                
                appendOutput(command, commandsSuccessMap.downloadCompleted);
            }
        } else if(option === "cv") {
            appendOutput(command, commandsMap.cv.map(translateCommandToHTML));
        } else {
            appendOutput(command, commandsExceptionsMap.commandNotFound.map(translateCommandToHTML));
        }
    }

    function handleCommand() {
        if (command.startsWith("theme")) {
            handleThemeCommand(command);
        } else if(command.startsWith("cv")) {
            handleCVCommand(command);
        } else if (command.startsWith("clear")) {
            handleClearCommand();
        } else {
            handleMappedCommand(command);
        }
        setCommand("");
    }

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
                    <p className="font-bold text-primary font-mono">{bashDesign}</p>&nbsp;
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