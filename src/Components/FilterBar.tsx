import { Flair } from "../Types/Types"

export const FilterBar = (params: {flairs: Flair[],setFilter: any}) => {
    return (
        <select className="post-filter" onChange={e => params.setFilter(e.target.value)}>
            <option value="All">All</option>
            {params.flairs.map(flair => {
                return <option value={flair.flairName}>{flair.flairName}</option>
            })}
        </select>
    )
}