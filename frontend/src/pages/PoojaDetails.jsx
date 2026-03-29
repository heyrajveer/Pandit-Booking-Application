import { useParams } from "react-router-dom";
import PujaViewer from "../compoments/pooja/PujaViewer";


function PujaDetails() {
  const { slug } = useParams();

  return <PujaViewer slug={slug} />;
}

export default PujaDetails;