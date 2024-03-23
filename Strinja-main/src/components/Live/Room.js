import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function Room() {
    const { roomId } = useParams();
    const zegoContainerRef = useRef(null);

    useEffect(() => {
        const myMeeting = async () => {
            const appID = 1524172562;
            const serverSecret = "50fed02984fd60de725b8fb9c8516af1";
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), "John Doe");
            const zp = ZegoUIKitPrebuilt.create(kitToken);
            zp.joinRoom({
                container: zegoContainerRef.current, // Use the ref here
                senario: {
                    mode: ZegoUIKitPrebuilt.VideoConference
                }
            });
        };

        myMeeting(); // Call the function when component mounts
    }, [roomId]); // Include roomId in the dependency array to re-run the effect when it changes

    return (
        <div style={{ marginTop: "90px", marginBottom: "250px" }}>
            {/* Use the ref here */}
            <div ref={zegoContainerRef} style={{ width: "100%", height: "500px" }}></div>
        </div>
    );
}

export default Room;
