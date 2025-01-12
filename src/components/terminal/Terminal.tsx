import { useState, useEffect, useRef, type ReactNode, useReducer } from "react";
import asciiArt from "./ascii-art";

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
import { keydownReducer, type Keydown } from "./keydown-reducer";

export function Terminal() {
    const bash = '[math-term:~$]';

    const [output, setOutput] = useState<React.ReactNode[]>([]);

    const [state, dispatch] = useReducer(keydownReducer, {
        prev: "",
        next: "",
        position: 0,
        history: [],
        historyIndex: 0,
    });

    const [isMobile, setIsMobile] = useState(false);

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

    function handleCommand(input: string) {
        const output = invoker.executeCommand(input);
        dispatch({ type: 'Enter', invoker });
        if (input === 'clear') setOutput([])
        else appendOutput(input, transformMarkdown(output))
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCommand(state.prev + state.next);
            return;
        }

        if (e.key.length === 1) {
            !isMobile && dispatch({ type: 'Letter', letter: e.key });
            return;
        }

        dispatch({ type: e.key as Keydown });
    }

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        if (!isMobile) return;

        const input = e.target.value;

        if (state.prev.length > input.length) dispatch({ type: 'Delete' })
        else if (state.prev.length < input.length) dispatch({ type: 'Letter', letter: input.slice(-1) })
    }

    function appendOutput(command: string, content: ReactNode[][]) {
        setOutput((prev) => [
            ...prev,
            <pre className="flex">
                <p className="font-bold text-primary">{bash}</p>&nbsp;<br />
                <p>{command}</p>
            </pre>,
            <br />,
            command === "welcome" ? asciiArt : null,
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
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        setIsMobile(isTouchDevice);

        handleCommand("welcome");

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
                <p>{state.prev}</p>
                <span className="inline-block w-[10px] h-[1.5em] bg-text animate-[blinker_1s_linear_infinite] font-mono"></span>
                <p>{state.next}</p>
            </pre>

            <textarea
                ref={textareaRef}
                autoFocus
                className="position absolute -left-96"
                value={state.prev + state.next}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                autoCapitalize="off"
            />
        </div>
    )
}