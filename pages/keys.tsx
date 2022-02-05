import key_info from "@/data/key";
import Main from "@/components/Main";
import { KeyIcon, DownloadIcon } from "@heroicons/react/solid";
const KeyView = () => {
  return (
    <Main>
      <div className="mx-2">
        <h1 className="py-10 text-center text-3xl">🔑 Public Keys</h1>
        <KeyItemView title="PGP Keys" keys={key_info["PGP Keys"]}>
          This public key is mainly used for digital signatures. In
          particular, it is used for signing code commits, emails, and
          important documents.
        </KeyItemView>
        <KeyItemView title="SSH Keys" keys={key_info["SSH Keys"]}>
          This public key is only used to log in to the remote server
          using SSH (when GPG-agent is not available).
        </KeyItemView>
        <div className="list-decimal pt-5 pb-10 text-sm font-light text-jbgray-light">
          <li>
            Any other public keys that are absent from this page are
            not representative of me.
          </li>
          <li>
            Any document that is not digitally signed or for which a
            signature file is not provided does not represent me.
          </li>
        </div>
      </div>
    </Main>
  );
};

const KeyItemView = ({ title, keys, children }) => {
  return (
    <div className="pb-10">
      <div className="border-b border-black-readable/20 pb-1 dark:border-white-readable/20">
        <div className="text-2xl">{title}</div>
      </div>
      <p className="py-4">{children}</p>
      {keys.map(key => (
        <KeyCardView key={key.name} keyItem={key}></KeyCardView>
      ))}
    </div>
  );
};

const KeyCardView = ({ keyItem }) => {
  return (
    <div className="secondbg flex items-center rounded-xl p-4">
      <div className="flex flex-col items-center">
        <KeyIcon className="mb-2 h-6 w-6 text-2xl text-emerald-700 dark:text-emerald-500" />
        <div className="rounded border border-jbgray-light/20 px-1 text-sm text-jbgray-light">
          {keyItem.type}
        </div>
      </div>
      <div className="ml-4 flex flex-grow flex-col items-start">
        <div className="text-lg">{keyItem.name}</div>
        <div className="text-sm">
          <code className="hidden md:block">
            {keyItem.fingerprint}
          </code>
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
            <div className="flex items-center rounded bg-emerald-700 px-2 py-1 text-sm text-white-readable">
              <DownloadIcon className="h-4 w-4" />
              <div className="hidden sm:block sm:pl-2">Download</div>
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

export default KeyView;
