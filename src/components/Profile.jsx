import React from 'react';

function Profile(props) {
    return (
        <div className="flex justify-center z-0">
            <div className="border-3 border-green-600 rounded-2xl w-full mx-16 my-8 p-8 bg-white shadow-lg">
                <div className="flex flex-col items-center">
                    {/* <img
            src="cartoon_image_url"
            alt="Cartoon Image"
            className="w-32 h-32 rounded-full mb-4"
          /> */}
                    <h5 className="text-2xl font-bold mb-3">{props.month} {props.year}</h5>
                    <h5 className="text-xl font-semibold mb-2">{props.name}</h5>
                    <h6 className="text-body-secondary">Average Score: {props.score}</h6>
                </div>
            </div>
        </div>
    );
}

export default Profile;
