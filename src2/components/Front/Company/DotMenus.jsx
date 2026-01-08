'use client'
const DotMenus = () => {
    return (
        <a href="" onClick={(e) => { e.preventDefault() }} className=" ml-auto text-red-600">
            <span className=" text-red-700  text-2xl">.</span>
            <span className=" text-red-600  text-2xl">.</span>
            <span className=" text-red-600  text-2xl">.</span>
        </a>
    )
}
export default DotMenus