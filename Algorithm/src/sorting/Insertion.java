package sorting;

public class Insertion {
	void sort(int a[]){
		for(int i=1;i<a.length;i++){
			int key= a[i];
			int j=i-1;
			while(j>=0 && key<a[j]){
				a[j+1]=a[j];
				j=j-1;
		   }
			a[j + 1]=key;
		}
		System.out.println("array is " + a[0] );
	}
	
	public static void main(String arr[]){
		int arr1[] = {12, 11, 13, 5, 6};
		Insertion obj = new Insertion();
		obj.sort(arr1);	
	}
}
