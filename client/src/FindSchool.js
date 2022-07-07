import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";

function FindSchool () {
    return (
        <div>
        <div className="schoolForm">

            <SearchElement text="Country " />
            <SearchElement text="Location " />
            <SearchElement text="School Name " />
            <SearchElement text="Responsible name " />
            <SearchElement text="When deployed " />
            <SearchElement text="Status " />
        </div>
        <AddButton />
        </div>
    );
}

function SearchElement (props) {
    return (
        <div>
            <span>{props.text}</span>
            <input className="inputBox" type="text" />
        </div>
    );
}

function AddButton () {
    return (
        <div>
             <Button colorScheme='teal' size='md'>
    Button
  </Button>
        </div>

    );
}

export default FindSchool;
