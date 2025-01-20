import { useState, useCallback ,useEffect,useRef} from "react";

function App() {
  const [length, setLength] = useState(8); // the default value of character length is 8
  const [numberAllowed, setNumberAllowed] = useState(false); // the default value of the number checkbox is false
  const [charAllowd, setCharAllowed] = useState(false); // the default value of the character checkbox is false
  const [password, setPassword] = useState(""); // the default value of the password field is empty


  //use ref hook
  const passwordRef =useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numberAllowed) str += "0123456789";
    if (charAllowd) str += "!@#$%^&*()_+";

    for (let i = 0; i <= length; i++) {
      // loop for password generation
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass); // set the password
  }, [length, numberAllowed, charAllowd, setPassword]); //useCallback is a React Hook that lets you cache a function definition between re-renders. it takes function and array of dependencies as arguments  , seetPassword is optional dependency

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select(); //highlight the password on clicking the copy button
    passwordRef.current?.setSelectionRange(0,101); //chooses the max char to be copied
    window.navigator.clipboard.writeText(password) //copy the password to clipboard
  }, [password]);

  useEffect(() => {passwordGenerator()},[length, numberAllowed, charAllowd,passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-black"
            placeholder="passoword"
            readOnly
            ref={passwordRef}
          />

          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" onClick={copyPasswordToClipboard}>
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowd}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev )
            }}
          />
          <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
