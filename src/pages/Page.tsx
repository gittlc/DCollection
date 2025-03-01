import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useState, useRef } from "react";
import StatusBarManager from "../components/StatusBarManager";
import Menu from "../components/Menu";
import { listObjects, getObject } from "../s3client";

import "./Page.css";

const Page: React.FC = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFilename, setSelectedFilename] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState();
  const [touchStartY, setTouchStartY] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    listObjects().then((files) => {
      setFiles(files);
      setSelectedFilename(files[0].Key);
    });
  }, []);

  useEffect(() => {
    if (selectedFilename) {
      getObject(selectedFilename).then((data: any) => {
        setSelectedFile(data);
      });
    }
  }, [selectedFilename]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [selectedFile]);

  const playNext = () => {
    const currentIndex = files.findIndex(
      (file: { Key: string }) => file.Key === selectedFilename
    );
    const nextIndex = (currentIndex + 1) % files.length;
    const nextFile = files[nextIndex];
    setSelectedFilename(nextFile?.Key);
  };

  const playPrevious = () => {
    const currentIndex = files.findIndex(
      (file: { Key: string }) => file.Key === selectedFilename
    );
    const previousIndex = (currentIndex - 1 + files.length) % files.length;
    const previousFile = files[previousIndex];
    setSelectedFilename(previousFile?.Key);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0) {
        playPrevious();
      } else {
        playNext();
      }
    }
  };

  return (
    <>
      <Menu
        files={files}
        selectedFilename={selectedFilename}
        setSelectedFilename={setSelectedFilename}
      />
      <IonPage id="main">
        <StatusBarManager />

        <IonContent
          fullscreen
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black",
            }}
          >
            <video
              ref={videoRef}
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                backgroundColor: "black",
              }}
              autoPlay
              controls
              onEnded={playNext}
              onError={playNext}
            >
              {selectedFile && <source src={selectedFile} />}
            </video>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Page;
