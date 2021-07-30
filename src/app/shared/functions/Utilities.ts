
export class Utilities{
  toSlugify(element: string | undefined){
    return element?.toLowerCase().split(' ').join('-')
  }
}
