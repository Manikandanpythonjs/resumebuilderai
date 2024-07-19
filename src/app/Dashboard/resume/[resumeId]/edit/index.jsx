import { useEffect } from "react";
import { useParams } from "react-router-dom"
import EditPreview from './../../../components//EditPreview/EditPreview'


function EditPage() {
    const params = useParams();


    useEffect(() => {

        console.log(params?.resumeId);
    }, [])
    return (
        <div>

            <EditPreview />

        </div>
    )
}

export default EditPage