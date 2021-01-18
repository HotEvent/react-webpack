import { InlineFragmentNode } from "graphql";
import React, { useEffect, useRef } from "react";



export const IFrame: React.FC = props => {
    const handleRequest = (e: MessageEvent) => {
        console.log(e);
        const response = {
            type: 'response',
            method: 'setToken',
            data: '123'
        };
        if (e.data.type === 'request') {
            let s = e.source as WindowProxy;
            s.postMessage(response, '*');
        }

    }
    useEffect(() => {
        window.addEventListener('message', handleRequest)
        return () => {
            window.removeEventListener('message', handleRequest);
        }
    }, [])
    return <div>
        <iframe frameBorder={0} src="http://localhost:8080/callback2" width="100%" height="900px"></iframe>
    </div>;
}