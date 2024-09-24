import Link from "next/link";

interface ButtonProps {
    name: string,
    href: string
}

export default function Button(props: ButtonProps) {
    return (
        <Link href={props.href} className="cursor-pointer hover:bg-black hover:text-white py-2 px-3 rounded">
          {props.name}
        </Link>
    );
}
