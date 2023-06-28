import React from 'react'

function Profile(props) {
    return (
        <div className="flex justify-center z-0">
            <div className="card">
                <div className="mt-4 mb-10 ml-4 mr-16">
                    <h5 className="text-5xl card-title mb-3">{props.month} {props.year}</h5>
                    <h5 className="text-2xl card-title font-semibold mb-2">{props.name}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Average Score: {props.score}</h6>
                </div>
            </div>
        </div>

    )
}

export default Profile