import Link from "next/link";

const Sidecount = ({ name, count }) => {
  const isMessageLink = name === "New Messages";

  const content = (
    <>
      <span className="text-[#B13634] rounded ltr:ml-1 rtl:mr-1 ltr:float-right rtl:float-left text-3xl font-semibold py-0.5 px-1 pr-3 pl-5 lg:pl-0">
        {count}
      </span>
      {name}
    </>
  );

  return (
    <li>
      {isMessageLink ? (
        <Link
          href="/message"
          className="text-[#171717] text-base lg:text-lg xl:text-xl font-semibold p-3 xl:py-6 xl:px-9 block border-t border-[#171717]"
        >
          {content}
        </Link>
      ) : (
        <span className="text-[#171717] text-base lg:text-lg xl:text-xl font-semibold p-3 xl:py-6 xl:px-9 block border-t border-[#171717] cursor-default">
          {content}
        </span>
      )}
    </li>
  );
};

export default Sidecount;
