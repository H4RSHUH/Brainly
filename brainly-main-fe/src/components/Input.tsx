export function Input({ref, placeholder}: {ref: any;  
    placeholder: string
}){
    return <div>
        <input placeholder={placeholder} type="text" className="py-2 px-4 border border-gray-300 m-2 rounded-md" ref={ref}/>
    </div>
}