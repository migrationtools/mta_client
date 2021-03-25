export class ArchCheckconfiguration {
  id: string;
  name: string;
  iconId: string;
  type: string;
  leaves?: ArchCheckconfiguration[];

  constructor(private idarg: string, nameArg: string, iconArg: string, typeArg: string, leafArg: ArchCheckconfiguration[]) {
    this.id = idarg;
    this.name = nameArg;
    this.iconId = iconArg;
    this.type = typeArg;
    this.leaves = leafArg;
  }

}
