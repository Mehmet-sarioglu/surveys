import PageComponent from "../components/PageComponent.jsx";
import {useStateContext} from "../Contexts/ContextProvider.jsx";
import SurveyListItem from "../components/SurveyListItem.jsx";
import TButton from "../components/core/TButton.jsx";
import {PlusCircleIcon} from "@heroicons/react/20/solid/index.js";
import {useEffect,useState} from "react";
import axiosClient from "../axios.js";

export default function Surveys () {
    // const { showToast } = useStateContext();
    const [surveys, setSurveys] = useState([]);
    const [meta, setMeta] = useState({});
    const [loading, setLoading] = useState(false);
    // console.log(surveys)
    const onDeleteClick =(id)=>{
        if (window.confirm("Are you sure you want to delete this survey?")) {
            axiosClient.delete(`/survey/${id}`).then(() => {
                getSurveys();
                // showToast('The survey was deleted');
            });
        }
    }

    const getSurveys = (url) => {
        url = url || "/survey";
        setLoading(true);
        axiosClient.get(url).then(({ data }) => {
            setSurveys(data.data);
            setMeta(data.meta);
            setLoading(false);
        });
    };

    useEffect(() => {
        getSurveys();
    }, []);


return (

<PageComponent title="Surveys" buttons={(
    <TButton color='green' to='/surveys/create'>
        <PlusCircleIcon className='h-6 w-6 mr-2'/>
        Create New
    </TButton>
)}>
    {loading && <div className="text-center text-lg">Loading...</div>}
    {!loading && (

        <>
            {surveys.length === 0 && (
                <div className="py-8 text-center text-gray-700">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    You don't have surveys created
                </div>
            )}
         <div className="grid grid-cols-1 gap-5 sm:grid-cols-5 md:grid-cols-3">

        {surveys.map(surveys=>(
            <SurveyListItem key={surveys.id} survey={surveys} onDeleteClick={onDeleteClick}/>
            ))}
       </div>
        </>
    )}
</PageComponent>
)
}
