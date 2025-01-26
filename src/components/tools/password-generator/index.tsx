import { useEffect, useReducer, useState } from "react";

import { settingsReducer, type SettingsType } from "./settings-reducer";
import { generatePassword } from "./generate-password";
import { getPasswordScore } from "./get-password-score";

export function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [passwordScore, setPasswordScore] = useState(100);

  const [settings, setSettings] = useReducer(settingsReducer, {
    length: 10,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const passwordSettingTypes = ['uppercase', 'lowercase', 'numbers', 'symbols'];

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSettings({
      type: e.target.name as SettingsType,
      value: e.target.name === 'length' ? e.target.value : e.target.checked,
    });
  }

  function handleCopyPassword() {
    navigator.clipboard.writeText(password);
  }

  function handleRegeneratePassword() {
    const newPassword = generatePassword(settings);
    setPassword(newPassword);
    setPasswordScore(getPasswordScore(newPassword));
  }

  useEffect(() => {
    const newPassword = generatePassword(settings);
    setPassword(newPassword);
    setPasswordScore(getPasswordScore(newPassword));
  }, [settings]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <pre className="relative">
          <input
            placeholder="None"
            value={password}
            readOnly
            className="bg-default border-2 border-default rounded-md p-4 w-full shadow-md outline-none"
          />
          <div className="group absolute top-1/2 -translate-y-1/3 right-10">
            <button
              onClick={handleCopyPassword}
              className="hover:text-primary active:text-secondary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M15 1.25h-4.056c-1.838 0-3.294 0-4.433.153c-1.172.158-2.121.49-2.87 1.238c-.748.749-1.08 1.698-1.238 2.87c-.153 1.14-.153 2.595-.153 4.433V16a3.75 3.75 0 0 0 3.166 3.705c.137.764.402 1.416.932 1.947c.602.602 1.36.86 2.26.982c.867.116 1.97.116 3.337.116h3.11c1.367 0 2.47 0 3.337-.116c.9-.122 1.658-.38 2.26-.982s.86-1.36.982-2.26c.116-.867.116-1.97.116-3.337v-5.11c0-1.367 0-2.47-.116-3.337c-.122-.9-.38-1.658-.982-2.26c-.531-.53-1.183-.795-1.947-.932A3.75 3.75 0 0 0 15 1.25m2.13 3.021A2.25 2.25 0 0 0 15 2.75h-4c-1.907 0-3.261.002-4.29.14c-1.005.135-1.585.389-2.008.812S4.025 4.705 3.89 5.71c-.138 1.029-.14 2.383-.14 4.29v6a2.25 2.25 0 0 0 1.521 2.13c-.021-.61-.021-1.3-.021-2.075v-5.11c0-1.367 0-2.47.117-3.337c.12-.9.38-1.658.981-2.26c.602-.602 1.36-.86 2.26-.981c.867-.117 1.97-.117 3.337-.117h3.11c.775 0 1.464 0 2.074.021M7.408 6.41c.277-.277.665-.457 1.4-.556c.754-.101 1.756-.103 3.191-.103h3c1.435 0 2.436.002 3.192.103c.734.099 1.122.28 1.399.556c.277.277.457.665.556 1.4c.101.754.103 1.756.103 3.191v5c0 1.435-.002 2.436-.103 3.192c-.099.734-.28 1.122-.556 1.399c-.277.277-.665.457-1.4.556c-.755.101-1.756.103-3.191.103h-3c-1.435 0-2.437-.002-3.192-.103c-.734-.099-1.122-.28-1.399-.556c-.277-.277-.457-.665-.556-1.4c-.101-.755-.103-1.756-.103-3.191v-5c0-1.435.002-2.437.103-3.192c.099-.734.28-1.122.556-1.399" clip-rule="evenodd" /></svg>
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded-lg px-3 py-1 shadow-lg">
              Copy
            </div>
          </div>

          <div className="group absolute top-1/2 -translate-y-1/3 right-3">
            <button
              onClick={handleRegeneratePassword}
              className=" hover:text-primary active:text-secondary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M5.516 14.224c-2.262-2.432-2.222-6.244.128-8.611a6.07 6.07 0 0 1 3.414-1.736L8.989 1.8a8.1 8.1 0 0 0-4.797 2.351c-3.149 3.17-3.187 8.289-.123 11.531l-1.741 1.752l5.51.301l-.015-5.834zm6.647-11.959l.015 5.834l2.307-2.322c2.262 2.434 2.222 6.246-.128 8.611a6.07 6.07 0 0 1-3.414 1.736l.069 2.076a8.12 8.12 0 0 0 4.798-2.35c3.148-3.172 3.186-8.291.122-11.531l1.741-1.754z" /></svg>
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded-lg px-3 py-1 shadow-lg">
              Regenerate password
            </div>
          </div>
        </pre>
        <div
          className="bg-default border-2 border-default rounded-full w-full"
        >
          <div
            className="rounded-full text-white duration-1000 h-4"
            style={{
              width: `${passwordScore}%`,
              backgroundColor: passwordScore > 70 ? 'var(--color-success)' : passwordScore > 40 ? 'var(--color-warning)' : 'var(--color-error)',
            }}
          />
        </div>
      </div>

      <div className="my-4 bg-offset pt-8 pb-16 px-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl text-start mb-8">Settings</h2>
        <div className="flex flex-wrap justify-between gap-8">
          <div className="flex flex-col gap-4 items-start">
            <label htmlFor="length">Password Length</label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                name="length"
                min={1}
                max={50}
                value={settings.length}
                onChange={handleChangeInput}
                className="text-center bg-default p-2 rounded-md focus:outline-none focus:outline-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <input
                type="range"
                name="length"
                min={1}
                max={50}
                value={settings.length}
                onChange={handleChangeInput}
                className="range pr-6 accent-primary hover:accent-highlight"
              />
            </div>
          </div>
          <div className="mx-auto">
            <ul className="flex flex-col gap-2">
              {passwordSettingTypes.map((type) => (
                <li
                  key={type}
                  className="flex items-center gap-2"
                >
                  <input
                    name={type}
                    type="checkbox"
                    checked={settings[type]}
                    onChange={handleChangeInput}
                    className="accent-primary size-4"
                  />
                  <label htmlFor={type}>{type}</label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}