import React from 'react';
import SuperCheckbox from "../../common/components/ui/c3-SuperCheckbox/SuperCheckbox";
import SuperInputText from "../../common/components/ui/c1-SuperInputText/SuperInputText";
import SuperButton from "../../common/components/ui/c2-SuperButton/SuperButton";
import styles from "./Components.module.css"

const Components = () => {
    return (
        <div className={styles.container}>
            <SuperCheckbox></SuperCheckbox>
            <SuperInputText></SuperInputText>
            <SuperButton>Click</SuperButton>
        </div>
    );
};

export default Components;