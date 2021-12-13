import key_info from "../data/key.js";
import Link from "next/link";
const KeyView = () => {
  return (
    <div className="text-black-readable bg-white-readable dark:text-white-readable dark:bg-black-readable">
      <div className="max-w-3xl mx-auto">
        <div className="mx-2">
          <h1 className="py-10 text-3xl text-center">🔑 Public Keys</h1>
          <KeyItemView title="PGP Keys" keys={key_info["PGP Keys"]}>
            This public key is mainly used for digital signatures. In
            particular, it is used for signing code commits, emails, and
            important documents.
          </KeyItemView>
          <KeyItemView title="SSH Keys" keys={key_info["SSH Keys"]}>
            This public key is only used to log in to the remote server using
            SSH (when GPG-agent is not available).
          </KeyItemView>
          <div className="font-light text-sm text-jbgray-light pt-5 pb-10 list-decimal">
            <li>
              Any other public keys that are absent from this page are not
              representative of me.
            </li>
            <li>
              Any document that is not digitally signed or for which a signature
              file is not provided does not represent me.
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

const KeyItemView = ({ title, keys, children }) => {
  return (
    <div className="pb-10">
      <div className="pb-1 border-b border-black-readable/20 dark:border-white-readable/20">
        <div className="text-2xl">{title}</div>
      </div>
      <p className="py-4">{children}</p>
      {keys.map((key) => (
        <KeyCardView key={key.name} keyItem={key}></KeyCardView>
      ))}
    </div>
  );
};

const KeyCardView = ({ keyItem }) => {
  return (
    <div className="p-4 rounded-xl border flex items-center border-black-readable/20 dark:border-white-readable/20 autobg">
      <div className="flex flex-col items-center">
        <i className="fas fa-key text-emerald-700 dark:text-emerald-500 text-2xl mb-2"></i>
        <div className="text-sm px-1 rounded border text-jbgray-light border-jbgray-light/20">
          {keyItem.type}
        </div>
      </div>
      <div className="flex-grow flex flex-col items-start ml-4">
        <div className="text-lg">{keyItem.name}</div>
        <div className="text-sm">
          <code className="hidden md:block">{keyItem.fingerprint}</code>
          <p className="pt-2 text-sm">
            <span className="text-emerald-700 dark:text-emerald-500">
              Valid since{" "}
            </span>
            {keyItem.since}
          </p>
          {keyItem.expire && (
            <p className="text-sm">
              <span className="text-slate-700 dark:text-slate-200">
                Valid until{" "}
              </span>
              {keyItem.expire}
            </p>
          )}
        </div>
      </div>
      {keyItem.url && (
        <div>
          <a href={keyItem.url}>
            <div className="bg-emerald-700 text-white-readable flex items-center px-2 py-1 rounded text-sm">
              <i className="fas fa-cloud-download-alt" />
              <div className="hidden sm:pl-2 sm:block">Download</div>
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

export default KeyView;