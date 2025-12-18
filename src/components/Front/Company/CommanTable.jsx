const CommanTable = (props) => {
    const collums = props.data.collums
    const rows = props.data.rows
    return (

                <div className="card-body px-3 pb-5 pt-4">
                    <div className="relative overflow-x-auto rounded-lg">
                        <table className="w-full text-sm text-left text-[#171717]">
                            <thead className="text-xs text-[#171717] font-myriad  pb-3">
                                <tr>
                                    {
                                        collums.map((row,i) => {
                                            return (
                                                <th  key={i} scope="col" className="px-1 py-1 pb-4 font-extrabold">{row}</th>
                                            )
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody className="text-xs font-semibold">
                                {
                                    rows.map((row,i) => {
                                        return (
                                                <tr key={i} className="bg-white   hover:bg-gray-50/50   whitespace-nowrap">
                                                    {
                                                        row.map((r1,i) => {
                                                            return (<td key={i} className="px-1 py-1">{r1}</td>)
                                                        })
                                                    }
                                                </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table >
                    </div>
                </div>

            )
}

export default CommanTable