import { useEffect, useState } from "react";
import JSONPretty from "react-json-pretty";
// import 'react-json-pretty/themes/monikai.css';

interface URLInformations extends Pick<
  URL,
  'host' | 'hostname' | 'hash' | 'search' | 'pathname' | 'port' | 'protocol' | 'href' | 'origin' | 'username' | 'password'
> {
  searchParams: Record<string, string>;
}

export function UrlPretty() {
  const [url, setUrl] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [informations, setInformations] = useState<URLInformations | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShow(true);

    const obj = new URL(url);
    const searchParamsObj: Record<string, string> = Object.fromEntries(obj.searchParams.entries());

    setInformations({
      host: obj.host,
      hostname: obj.hostname,
      hash: obj.hash,
      search: obj.search,
      pathname: obj.pathname,
      port: obj.port,
      protocol: obj.protocol,
      href: obj.href,
      origin: obj.origin,
      username: obj.username,
      password: obj.password,
      searchParams: searchParamsObj
    });
  }

  useEffect(() => {
    const regex = /^(https?|ftp|file|ws|wss):\/\/[^\s/$.?#].[^\s]*$/;
    setIsValid(regex.test(url));
  }, [url]);

  if (show && informations) {
    return (
      <>
        <JSONPretty
          id="json-pretty"
          data={informations}
          theme={{
            main: 'line-height:1.3; color:var(--color-text); background:var(--color-background); overflow:auto; border:1px solid var(--color-border); padding:1em; border-radius:0.5em;',
            key: 'color:var(--color-primary);',
            string: 'color:var(--color-secondary);',
            value: 'color:var(--color-primary);',
            boolean: 'color:var(--color-secondary);',
          }}
        />

        <button
          type="button"
          className="w-full px-10 py-4 text-base text-center font-semibold transition-all duration-200 rounded bg-primary hover:bg-secondary focus:bg-secondary text-white mt-4"
          onClick={() => {
            setUrl('');
            setShow(false);
          }}
        >
          Another URL
        </button>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="rounded-md bg-offset px-4 py-2 min-h-32 outline-none w-full"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com/a/b?c=d#e"
        required
      />

      {Boolean(!isValid && url.length > 0) && (
        <p className="text-red-500 text-sm mt-2 text-end">Please enter a valid URL</p>
      )}

      <button
        type="submit"
        className="w-full px-10 py-4 text-base text-center font-semibold transition-all duration-200 rounded bg-primary hover:bg-secondary focus:bg-secondary text-white mt-4 disable:cursor-not-allowed disabled:opacity-50"
        disabled={!isValid}
      >
        Submit
      </button>
    </form >
  )
}