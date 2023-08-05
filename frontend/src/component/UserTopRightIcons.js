import { Button, Image } from "react-bootstrap"
import { DeleteButton } from "./DeleteButton"
import { EditButton } from "./EditButton"
import { LineChartButton } from "./LineChartButton"

export const UserTopRightIcons = ({handleDelete,handleUpdate,handleFileChange,inputRef,handleLineChartClick}) => {
    return (
        <div className="topRightUserIcons">
            <input
                style={{ display: 'none' }}
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
            />
            <LineChartButton handleLineChartClick={handleLineChartClick}/>
            <EditButton handleUpdate={handleUpdate}/>
            <DeleteButton handleDelete={handleDelete}/>
        </div>
    )

}