import { useState, useEffect, useRef, type ReactNode } from "react";

import {
    CommandInvoker,
    ClearCommand,
    CVCommand,
    EchoCommand,
    EducationCommand,
    ExperienceCommand,
    HelpCommand,
    ProjectsCommand,
    SkillsCommand,
    SocialCommand,
    ThemeCommand,
    WelcomeCommand,
    WhoAmICommand,
    GamesCommand
} from "./commands";

import { transformMarkdown } from "./transform-markdown";

export function Terminal() {
    const bash = '[math-term:~$]';

    const [prev, setPrev] = useState("welcome");
    const [next, setNext] = useState("");
    const [position, setPosition] = useState(prev.length + next.length - 1);

    const [output, setOutput] = useState<React.ReactNode[]>([]);
    const [history, setHistory] = useState<string[]>([]);
    const [_, setHistoryIndex] = useState(0);


    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const invoker = new CommandInvoker();
    invoker.registerCommand("whoami", new WhoAmICommand());
    invoker.registerCommand("experience", new ExperienceCommand());
    invoker.registerCommand("education", new EducationCommand());
    invoker.registerCommand("skills", new SkillsCommand());
    invoker.registerCommand("projects", new ProjectsCommand());
    invoker.registerCommand("social", new SocialCommand());
    invoker.registerCommand("cv", new CVCommand());
    invoker.registerCommand("theme", new ThemeCommand());
    invoker.registerCommand("games", new GamesCommand());
    invoker.registerCommand("help", new HelpCommand());
    invoker.registerCommand("welcome", new WelcomeCommand());
    invoker.registerCommand("echo", new EchoCommand());
    invoker.registerCommand("clear", new ClearCommand());

    const handleCommand = () => {
        const input = prev + next;

        setHistory((prev) => [...prev, input]);
        setHistoryIndex(history.length + 1);

        const result = invoker.executeCommand(input);

        if (input === "clear") {
            setOutput([]);
            setHistory([]);
        } else {
            appendOutput(input, transformMarkdown(result));
        }
        setPrev("");
        setNext("");
        setPosition(0);
    }

    const commands: { [key: string]: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void } = {
        Enter: (e) => {
            e.preventDefault();
            handleCommand();
        },
        ArrowUp: () => {
            setHistoryIndex((index) => {
                const newIndex = Math.max(index - 1, 0);
                setPrev(history[newIndex] || "");
                return newIndex;
            });
        },
        ArrowDown: () => {
            setHistoryIndex((index) => {
                const newIndex = Math.min(index + 1, history.length);
                const input = history[newIndex] || "";
                setPrev(input);
                setNext("");
                setPosition(input.length - 1)
                return newIndex;
            });
        },
        ArrowLeft: () => {
            setPosition((current) => {
                const newPosition = Math.max(0, current - 1);
                setPrev(prev.slice(0, prev.length - 1));
                setNext(prev.slice(-1) + next);
                return newPosition;
            });
        },
        ArrowRight: () => {
            setPosition((current) => {
                const newPosition = Math.min(prev.length + next.length - 1, current + 1);
                setPrev(prev + next.slice(0, 1));
                setNext(next.slice(1));
                return newPosition;
            });
        },
        Backspace: () => {
            if(prev.length === 0) return;
            setPrev(prev.slice(0, prev.length - 1));
            setPosition(position - 1);
        },
        Home: () => {
            setPrev("")
            setNext(prev + next);
            setPosition(0);
        },
        End: () => {
            setPrev(prev + next);
            setNext("");
            setPosition(prev.length + next.length - 1);
        },
        Delete: () => {
            if(next.length === 0) return;
            setNext(next.slice(1));
        },
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const command = commands[e.key];
        if (command) {
            command(e);
            return;
        };

        if(e.key.length === 1) {
            setPrev(prev + e.key);
            setPosition(position + 1);
        }

        console.log(e.key);
    };

    function appendOutput(command: string, content: ReactNode[][]) {
        setOutput((prev) => [
            ...prev,
            <pre className="flex">
                <p className="font-bold text-primary">{bash}</p>&nbsp;<br />
                <p>{command}</p>
            </pre>,
            <br />,
            ...content.map((c, i) => (
                <pre className="whitespace-pre-wrap" key={i}>
                    {c}
                </pre>
            )),
            <br />,
        ]);
    }

    useEffect(() => {
        handleCommand();

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
            <pre className="output">
                {output.map((line, index) => (
                    <pre key={index}>{line}</pre>
                ))}
            </pre>

            <pre className="flex">
                <p className="font-bold text-primary font-mono">{bash}</p>&nbsp;
                <p>{prev}</p>
                <span className="inline-block w-[10px] h-[1.5em] bg-text animate-[blinker_1s_linear_infinite] font-mono"></span>
                <p>{next}</p>
            </pre>

            <textarea
                ref={textareaRef}
                autoFocus
                className="position absolute -left-96"
                value={prev + next}
                onKeyDown={handleKeyDown}
                autoCapitalize="off"
            />
        </div>
    )
}