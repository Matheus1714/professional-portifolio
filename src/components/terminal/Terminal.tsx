import { useState, useEffect, useRef, type ReactNode, useReducer } from "react";

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
            dispatch({ type: 'Letter', letter: e.key });
            return;
        }

        dispatch({ type: e.key as Keydown });
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

    if (isMobile) {
        return (
            <section className="bg-background  min-h-full  flex items-center">
                <div className="flex flex-col items-center max-w-sm mx-auto text-center">
                    <h1 className="text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 20 20"><g fill="currentColor"><path d="M12.675 15.138a.675.675 0 1 1-1.35 0a.675.675 0 0 1 1.35 0" /><path fill-rule="evenodd" d="M12 14.963a.175.175 0 1 0 0 .35a.175.175 0 0 0 0-.35m-1.175.175a1.175 1.175 0 1 1 2.35 0a1.175 1.175 0 0 1-2.35 0" clip-rule="evenodd" /><path fill-rule="evenodd" d="M6 3.5A2.5 2.5 0 0 1 8.5 1h7A2.5 2.5 0 0 1 18 3.5v13a2.5 2.5 0 0 1-2.5 2.5H8a2 2 0 0 1-2-2v-1.5a.5.5 0 0 1 1 0V17a1 1 0 0 0 1 1h7.5a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 15.5 2h-7A1.5 1.5 0 0 0 7 3.5v3.25a.5.5 0 0 1-1 0z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M2.893 12.795c.62.35 1.512.581 2.524.581s1.904-.232 2.525-.581c.637-.358.893-.775.893-1.122s-.256-.765-.893-1.123c-.62-.35-1.512-.58-2.525-.58s-1.903.23-2.524.58c-.637.358-.893.775-.893 1.123c0 .347.256.764.893 1.122m-.49.872C1.62 13.227 1 12.542 1 11.673c0-.87.621-1.555 1.402-1.994c.797-.449 1.864-.71 3.015-.71s2.219.261 3.016.71c.78.439 1.402 1.124 1.402 1.994s-.621 1.554-1.402 1.994c-.797.448-1.864.71-3.016.71c-1.15 0-2.218-.262-3.015-.71" clip-rule="evenodd" /><path fill-rule="evenodd" d="M5.417 7.5a.5.5 0 0 1 .5.5v1.47a.5.5 0 0 1-1 0V8a.5.5 0 0 1 .5-.5m2.057.255a.5.5 0 0 1 .392.588l-.244 1.224a.5.5 0 0 1-.981-.196l.245-1.224a.5.5 0 0 1 .588-.392m-4.114 0a.5.5 0 0 0-.392.588l.245 1.224a.5.5 0 1 0 .98-.196L3.95 8.147a.5.5 0 0 0-.588-.392m-2.119.795a.5.5 0 0 0-.172.687l.735 1.224a.5.5 0 1 0 .857-.515L1.93 8.722a.5.5 0 0 0-.686-.171m8.348-.001a.5.5 0 0 1 .172.687l-.735 1.224a.5.5 0 1 1-.857-.515l.734-1.224a.5.5 0 0 1 .686-.171" clip-rule="evenodd" /><path d="M5.42 10.4a1.25 1.25 0 1 1 0 2.5a1.25 1.25 0 0 1 0-2.5" /><path fill-rule="evenodd" d="M4.67 11.65a.75.75 0 1 0 1.5 0a.75.75 0 0 0-1.5 0m.75 1.75a1.75 1.75 0 1 1 0-3.5a1.75 1.75 0 0 1 0 3.5" clip-rule="evenodd" /><path d="M1.15 1.878a.514.514 0 0 1 .728-.727l16.971 16.971a.514.514 0 0 1-.727.727z" /></g></svg>
                    </h1>
                    <h1 className="mt-3 text-2xl font-semibold md:text-3xl"></h1>
                    <p className="mt-4 text-offset">Page not mobile-enabled</p>

                    <a href="/">
                        <button className="mt-5 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 rounded-lg shrink-0 sm:w-auto bg-primary hover:bg-secondary">
                            Take me home
                        </button>
                    </a>
                </div>
            </section>
        )
    }

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
                autoCapitalize="off"
            />
        </div>
    )
}