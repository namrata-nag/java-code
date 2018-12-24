package Competitive;

public class DuplicateElement {
	void duplicateElement(int[] arr){
		int a = arr[0];
		arr[0]=0;
		while(arr[a]!=0){
			int i = a;
			a=arr[a];
			arr[i]=0;
			
		}
		System.out.print("Duplicate element : "+ a);
	}
	public static void main(String []str){
		int []arr = {1,2,3,4,4};
		DuplicateElement obj = new DuplicateElement();
		obj.duplicateElement(arr);
	}
}
