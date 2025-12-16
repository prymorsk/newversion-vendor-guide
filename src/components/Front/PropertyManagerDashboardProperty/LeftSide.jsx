import SaveEditButton from "@/components/Front/SaveEditButton";

const LeftSide = (props) =>{
    return(
        <div className="col-span-2 md:col-span-1 lg:pl-3">
          <div className="text-xl font-semibold text-[#171717] text-left leading-[1.5rem]">
            <p className="lg:text-[1.5rem] md:text-xl text-xl font-medium">Solstice Springs</p>
            <p>234 Pine Drive</p>
            <p> Minneapolis MN 55674</p>
          </div>
          <div className="flex pt-16 text-left font-semibold">
            <ul className="pr-10 text-lg leading-[1.4rem]">
              <li>Regional Manager</li>
              <li>Property Manager</li>
              <li>Leasing Manager</li>
            </ul>
            <ul className="text-lg leading-[1.4rem]">
              <li>Clay Brooks</li>
              <li>Noah Bennet</li>
              <li>Jordyn Hamilton</li>
            </ul>
          </div>
          <div className="my-10">
            <form>
            <div className="flex text-center justify-center gap-x-6  lg:pr-16">
              <SaveEditButton name="Add/Edit"/>
              </div>
            </form>
          </div>
        </div>
        
    )
}

export default LeftSide