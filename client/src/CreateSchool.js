import React from "react";
import { Button } from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

function CreateSchool () {
    return (
        <div>
        <form className="schoolForm">

            <AddSchoolElement text="Country " />
            <AddSchoolElement text="Location " />
            <AddSchoolElement text="School Name " />
            <AddSchoolElement text="Responsible name " />
            <AddSchoolElement text="When deployed " />
            <AddSchoolElement text="Status " />
        </form>
        <AddButton />
        </div>
    );
}

function AddSchoolElement (props) {
    return (
        <div>

        <FormControl>
            <FormLabel htmlFor={props.text}>{props.text}</FormLabel>
           <Input id={props.text} className="inputBox" type="text" />
        </FormControl>
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

export default CreateSchool;
