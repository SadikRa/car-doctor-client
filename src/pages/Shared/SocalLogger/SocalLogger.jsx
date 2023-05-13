import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProviders";

const SocalLogger = () => {


    const {googleSignIn} = useContext(AuthContext);

    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(result =>{
            console.log(result.user)
        })
        .catch(error => console.log(error))
    }

  return (
    <div className="mb-8">
      <div className="divider">OR</div>
      <div className="text-center">
        <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline">
          G
        </button>
      </div>
    </div>
  );
};

export default SocalLogger;
