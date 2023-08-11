import PageComponent from "../components/PageComponent.jsx";
import {useStateContext} from "../Contexts/ContextProvider.jsx";
import SurveyListItem from "../components/SurveyListItem.jsx";
import TButton from "../components/core/TButton.jsx";
import {PlusCircleIcon} from "@heroicons/react/20/solid/index.js";

export default function Surveys () {
    const {surveys}=useStateContext();
    // console.log(surveys)
    const onDeleteClick =()=>{
        console.log('on delete click')
    }
return (
<PageComponent title="Surveys" buttons={(
    <TButton color='green' to='/surveys/create'>
        <PlusCircleIcon className='h-6 w-6 mr-2'/>
        Create New
    </TButton>
)}>
   <div className="grid grid-cols-1 gap-5 sm:grid-cols-5 md:grid-cols-3">

    {surveys.map(surveys=>(
        <SurveyListItem key={surveys.id} survey={surveys} onDeleteClick={onDeleteClick}/>
        ))}
   </div>

</PageComponent>
)
}
