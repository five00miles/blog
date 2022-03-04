/// <reference path="./tools.d.ts" />
const isString = (arg: unknown): arg is string => typeof arg === 'string'

function useIt(numOrStr: number | string) {
    if (isString(numOrStr)) {
        console.log(numOrStr.length)
    }
}

interface IBoy {
    name: "mike";
    gf: string;
}

interface IGirl {
    name: "sofia";
    bf: string;
}

function getLover(child: IBoy | IGirl): string {
    if (child.name === "mike") {
        return child.gf;
    } else {
        return child.bf;
    }
}

interface ILogInUserProps {
    isLogin: boolean;
    name: string;
}

interface IUnLoginUserProps {
    isLogin: boolean;
    from: string;
}

type UserProps = ILogInUserProps | IUnLoginUserProps;

function getUserInfo(user: ILogInUserProps | IUnLoginUserProps): string {
    return 'name' in user ? user.name : user.from;
}


interface person {
    a: number,
    b: number,
    c: number,
    d: number,
}

function usePerson(obj: RequiredMy<person>) {

}

type demo1 = Omit<person, 'a' | 'b'>
type demo2 = Exclude<person, 'a' | 'b'>

