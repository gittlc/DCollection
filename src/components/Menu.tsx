import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
  IonMenu,
} from "@ionic/react";
import { videocamOutline } from "ionicons/icons";
import "./Menu.css";

const Menu: React.FC<{
  files: any;
  selectedFilename: string;
  setSelectedFilename: any;
}> = ({ files, selectedFilename, setSelectedFilename }) => {
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="labels-list">
          {files?.map((file: any, index: number) => (
            <IonItem
              lines="full"
              key={index}
              button
              onClick={() => setSelectedFilename(file.Key)}
              color={selectedFilename === file.Key ? "primary" : ""}
            >
              <IonThumbnail slot="start">
                <IonIcon
                  aria-hidden="true"
                  icon={videocamOutline}
                  size="large"
                />
              </IonThumbnail>
              <IonLabel>{file.Key}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
