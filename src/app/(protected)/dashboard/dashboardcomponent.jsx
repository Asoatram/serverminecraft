'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function DashboardComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/server', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch server data');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);


  if(loading){
    return(
        <div className="flex h-screen w-screen justify-center items-center">
        <Card className="flex flex-col w-1/2 h-1/2 items-center py-2">
          <CardHeader>
            <CardTitle>Start The Server</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 items-center">
            <Badge className="bg-yellow-500 hover:bg-yellow-700 w-16">Loading</Badge>
          </CardContent>
          </Card>
        </div>
    )
  }

  if(!loading && data.status === "stopped"){
    return(
        <div className="flex h-screen w-screen justify-center items-center">
        <Card className="flex flex-col w-1/2 h-1/2 items-center py-2">
          <CardHeader>
            <CardTitle>Start The Server</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 items-center">
            <DashboardComponentStopped/>
          </CardContent>
          </Card>
        </div>
    )
  } else if(!loading && data.status === "running"){
    return(
        <div className="flex h-screen w-screen justify-center items-center">
        <Card className="flex flex-col w-1/2 h-1/2 items-center py-2">
          <CardHeader>
            <CardTitle>Start The Server</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 items-center">
            <DashboardComponentRunning/>
          </CardContent>
          </Card>
        </div>
    )
  }
  else if(!loading && data.status === "stopping"){
    return(
        <div className="flex h-screen w-screen justify-center items-center">
        <Card className="flex flex-col w-1/2 h-1/2 items-center py-2">
          <CardHeader>
            <CardTitle>Start The Server</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 items-center">
            <DashboardComponentStopping/>
          </CardContent>
          </Card>
        </div>
    )
  }
}


export function DashboardComponentStopped() {
    const startServer = async () => {
        const response = await fetch('/api/server/start-server', {
            method: 'POST',
            cache: 'no-store',
        });

        if (response.ok) {
            window.location.reload(); // Refresh the page after a successful request
        } else {
            console.error('Failed to start the server');
        }
    };

    return (
        <>
            <Badge className="bg-red-500 hover:bg-red-700">Stopped</Badge>
            <p>IP Address: asoatramserver.ddns.net</p>
            <Button onClick={startServer}>Start</Button>
        </>
    );
}

export function DashboardComponentRunning() {
    const stopServer = async () => {
        const response = await fetch('/api/server/stop-server', {
            method: 'POST',
            cache: 'no-store',
        });

        if (response.ok) {
            window.location.reload(); // Refresh the page after a successful request
        } else {
            console.error('Failed to stop the server');
        }
    };

    return (
        <>
            <Badge className="bg-green-500 hover:bg-green-700">Running</Badge>
            <p>IP Address: asoatramserver.ddns.net</p>
            <Button onClick={stopServer}>Stop</Button>
        </>
    );
}

function DashboardComponentStopping() {

    return (
        <>
            <Badge className="bg-red-500 hover:bg-red-700">Stopping</Badge>
            <p>IP Address: asoatramserver.ddns.net</p>
            <Button disabled>Wait...</Button>
        </>
    );
}