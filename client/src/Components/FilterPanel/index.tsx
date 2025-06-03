import { useState } from "react";

const FilterPanel = () => {

    const [expandedPanel, setExpandedPanel] = useState<Boolean>(true);

    return(
        <>
            {
                expandedPanel ? 
                <div>
                    Expanded panel
                    <div onClick={() => setExpandedPanel(false)}> {'>'}</div>
                </div>
                : 
                <div>
                    Closed panel
                </div>
                
            }
        </>
    )
}

export default FilterPanel